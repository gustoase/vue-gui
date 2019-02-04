import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Fieldset from '@/components/editor/ui/Fieldset';
import Row from '@/components/editor/ui/Row';
import Col from '@/components/editor/ui/Col';
import Div from '@/components/editor/ui/Div';
import Input from '@/components/editor/ui/Input';

import { VFlex } from 'vuetify/lib';


function findElementByPath(o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
}

function addChildToTree(tree, child, index, parent_level) {
  let levels = parent_level.split('.').filter(n => n);

  if(levels.length > 1) levels.shift();

  levels = levels.map((i) => i+'.children').join('.');

  let children = findElementByPath(tree, levels);
  if (!children) {
    console.warn('addChild not found children',parent_level, levels)
    return;
  }

  children.splice(index, 0, child);
}

function removeChildFromTree(tree, level) {
  let levels = level.split('.').filter(n => n);
  if(levels.length > 1) levels.shift();
  let remove_index = levels.pop();

  levels = levels.map((i) => i+'.children').join('.');

  let children = findElementByPath(tree, levels);
  if (!children) {
    console.warn('removeChild not found children', level, levels)
    return;
  }

  children.splice(remove_index, 1);
}


export default new Vuex.Store({
  state: {
    tree: [
      // {
      //   "type": "container",
      //   "id": 1,
      //   "children": [
      //     {
      //       "type": "container",
      //       "id": "container",
      //       "children": [
      //           {
      //             "type": "container",
      //             "id": "1.1",
      //             "children": []
      //           },
      //       ]
      //     },
      //     {
      //       "type": "container",
      //       "id": "2",
      //       "children": []
      //     },
      //     {
      //       "type": "container",
      //       "id": "3",
      //       "children": []
      //     }
      //   ]
      // },
      {
        id: 1,
        component: 'Div',
        params: {
          class: "main-drop-list",
        },
        children: [
          {
            id: 2,
            component: 'Fieldset',
            params:{},
            children: [
              {
                id: 20,
                component: 'Row',
                params:{},
                children: [
                  {
                    id: 200,
                    component: 'Col',
                    params:{},
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    components: {
      'Div': Div,
      'Row': Row,
      'Col': Col,
      'Fieldset': Fieldset,
      'Input': Input
    }
  },
  mutations: {
    insertItem (state, {parent_level, event }) {
      console.log('insertItem', parent_level, event);
      addChildToTree(state.tree, event.item, event.index, parent_level)
    },
    deleteItem (state, {item_level, index}) {
      console.log('deleteItem',item_level, index);
      removeChildFromTree(state.tree, item_level);
    },
  },
  actions: {
    inserItem ({ commit }, data) {
      commit('insertItem', data);
    },
    delItem ({ commit }, data) {
      commit('deleteItem', data);
    }
  },
  getters: {
    tree: state => {
      return state.tree;
    },
    components: state => {
      return state.components;
    }
  }
})
