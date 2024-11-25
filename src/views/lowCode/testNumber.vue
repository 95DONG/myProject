<template>
  <div>
    <el-tree
      show-checkbox
      :load="loadNode"
      check-strictly
      lazy
      :props="defaultProps"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultProps: {
        label: 'label',
        children: 'children',
        isLeaf: 'isLeaf'
      },
      treeData: [
        {
          "id": "SHENGWEIBANGONGTING",
          "parentId": "0",
          "label": "省委办公厅",
          "isLeaf": false,
          "children": [
            {
              "id": "SHENGWEIBANGONGTING_DUCHABAN",
              "parentId": "SHENGWEIBANGONGTING",
              "label": "督查办",
              "value": null,
              "weight": 5,
              "isLock": true,
              "isLeaf": false,
              "isCheck": false,
              "children": [
                {
                  "id": "SHENGWEIBANGONGTING_DUCHABAN_DUCHAYICHU",
                  "parentId": "SHENGWEIBANGONGTING_DUCHABAN",
                  "label": "督察一处",
                  "value": null,
                  "weight": 51,
                  "isLock": false,
                  "isLeaf": true,
                  "isCheck": false,
                  "children": [],
                  "code": null,
                  "contact": null,
                  "contactCode": null,
                  "contactMobile": null,
                  "divCode": null,
                  "divName": null,
                  "foundTime": null,
                  "functionary": null,
                  "functionaryCode": null,
                  "leader": null,
                  "leaderCode": null,
                  "leafStatus": null,
                  "name": null,
                  "no": null,
                  "describe": null,
                  "orgFunction": null,
                  "type": null,
                  "parentCode": null,
                  "parentName": null,
                  "parentNo": null,
                  "status": null,
                  "leaderNo": null,
                  "siteId": null,
                  "levelCode": null,
                  "category": "xingzhengjiguan",
                  "decideCount": 0,
                  "indeedCount": 0
                }
              ],
              "code": null,
              "contact": null,
              "contactCode": null,
              "contactMobile": null,
              "divCode": null,
              "divName": null,
              "foundTime": null,
              "functionary": null,
              "functionaryCode": null,
              "leader": null,
              "leaderCode": null,
              "leafStatus": null,
              "name": null,
              "no": null,
              "describe": null,
              "orgFunction": null,
              "type": null,
              "parentCode": null,
              "parentName": null,
              "parentNo": null,
              "status": null,
              "leaderNo": null,
              "siteId": null,
              "levelCode": null,
              "category": "xingzhengjiguan",
              "decideCount": 0,
              "indeedCount": 0
            },
            {
              "id": "SHENGWEIBANGONGTING_ZHUANYONGTONGXINJU",
              "parentId": "SHENGWEIBANGONGTING",
              "label": "专用通信局",
              "value": null,
              "weight": 6,
              "isLock": false,
              "isLeaf": true,
              "isCheck": false,
              "children": [],
              "code": null,
              "contact": null,
              "contactCode": null,
              "contactMobile": null,
              "divCode": null,
              "divName": null,
              "foundTime": null,
              "functionary": null,
              "functionaryCode": null,
              "leader": null,
              "leaderCode": null,
              "leafStatus": null,
              "name": null,
              "no": null,
              "describe": null,
              "orgFunction": null,
              "type": null,
              "parentCode": null,
              "parentName": null,
              "parentNo": null,
              "status": null,
              "leaderNo": null,
              "siteId": null,
              "levelCode": null,
              "category": "xingzhengjiguan",
              "decideCount": 0,
              "indeedCount": 0
            }
          ]
        }
      ]
    };
  },
  methods: {
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve([{
          "id": "SHENGWEIBANGONGTING",
          "parentId": "0",
          "label": "省委办公厅",
          "isLeaf": false,
        }]);
      } else {

        return resolve(this.getOneLeaft(this.treeData, node.data.id));
      }
    },
    getOneLeaft (data, id) {
      for (let i = 0; i < data.length; i++) {
        let item = data[i];

        if (item.id === id) {
          item.children.children = []
          return item.children
        } else {
          if (item.children && item.children.length > 0) {
            let res = this.getOneLeaft(item.children, id);
            if (res) return res;
          }
        }
      }
    }

  }
};
</script>

<style>
</style>
