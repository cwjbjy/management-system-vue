<template>
  <div id="sample">
    <div id="myDiagramDiv"></div>
    <div id="myOverviewDiv"></div>
    <div class="search">
      <input type="search" id="mySearch" onkeypress="if (event.keyCode === 13) searchDiagram()" />
      <el-button @click="searchDiagram()">查询</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PositionChart',
  data() {
    return {
      myDiagram: null,
    };
  },
  mounted() {
    this.dealShow();
    let doc = document.querySelector('#myDiagramDiv').lastElementChild;
    let str = doc.getAttribute('style');
    str = str.replace('overflow: auto', 'overflow: hidden');
    doc.setAttribute('style', str);
  },
  methods: {
    dealShow: function () {
      const go = window.go;
      var $ = go.GraphObject.make; // for conciseness in defining templates
      // some constants that will be reused within templates
      var mt8 = new go.Margin(8, 0, 0, 0);
      // var mr8 = new go.Margin(0, 8, 0, 0);
      // var ml8 = new go.Margin(0, 0, 0, 8);
      this.myDiagram = $(
        go.Diagram,
        'myDiagramDiv', // the DIV HTML element
        {
          initialDocumentSpot: go.Spot.Top,
          initialViewportSpot: go.Spot.Top,
          isReadOnly: true,
          layout: $(
            go.TreeLayout, // use a TreeLayout to position all of the nodes
            {
              isOngoing: false, // 当面板展开/折叠时，不要继电器
              treeStyle: go.TreeLayout.StyleLastParents,
              angle: 90,
              layerSpacing: 80,
              alternateAngle: 90,
              alternateAlignment: go.TreeLayout.AlignmentBus,
            },
          ),
        },
      );
      function textStyle() {
        return [
          {
            font: '12px Roboto, sans-serif',
            stroke: 'rgba(0, 0, 0, .60)',
          },
        ];
      }
      // define the Node template
      this.myDiagram.nodeTemplate = $(
        go.Node,
        'Auto',
        {
          //节点模板样式设置
          isShadowed: true,
          shadowBlur: 1,
          shadowOffset: new go.Point(0, 1),
          shadowColor: 'rgba(0, 0, 0, .14)',
          selectionAdornmentTemplate: $(
            go.Adornment,
            'Auto',
            $(
              go.Shape,
              'RoundedRectangle',
              { fill: null, stroke: '#409eff', strokeWidth: 3 }, //选中之后节点边框颜色
            ),
            $(go.Placeholder),
          ), // end Adornment
        },
        $(
          go.Shape,
          'RoundedRectangle',
          { fill: '#ffffff', strokeWidth: 0 },
          // 搜索时，被搜索到就变色
          new go.Binding('fill', 'isHighlighted', function (h) {
            return h ? '#409eff' : '#ffffff';
          }).ofObject(),
        ),
        $(
          go.Panel,
          'Vertical',
          $(
            go.Panel,
            'Horizontal',
            { margin: 8 },
            // $(
            //   go.Picture,
            //   { margin: mr8, width: 50, height: 50 },
            //   new go.Binding("source", "nation", theNationFlagConverter)
            // ),
            $(
              go.Panel,
              'Table', //table布局
              $(
                go.TextBlock,
                {
                  row: 0,
                  alignment: go.Spot.Left, //第一行的内容
                  font: '16px Roboto, sans-serif',
                  stroke: 'rgba(0, 0, 0, .87)',
                  maxSize: new go.Size(160, NaN),
                },
                new go.Binding('text', 'name'),
              ),
              // $(
              //   go.TextBlock,
              //   textStyle("title"),
              //   {
              //     row: 1,
              //     alignment: go.Spot.Left,
              //     maxSize: new go.Size(160, NaN)
              //   },
              //   new go.Binding("text", "title")
              // ),
              // $("PanelExpanderButton", "INFO", {
              //   row: 0,
              //   column: 1,
              //   rowSpan: 2,
              //   margin: ml8
              // })
            ),
          ),
          $(
            go.Shape,
            'LineH',
            {
              stroke: 'rgba(0, 0, 0, .60)',
              strokeWidth: 1,
              height: 1,
              stretch: go.GraphObject.Horizontal,
            },
            new go.Binding('visible').ofObject('INFO'), // only visible when info is expanded
          ),
          $(
            go.Panel,
            'Vertical',
            {
              name: 'INFO', // identify to the PanelExpanderButton
              stretch: go.GraphObject.Horizontal, // take up whole available width
              margin: 8,
              defaultAlignment: go.Spot.Left, // thus no need to specify alignment on each element
            },
            $(
              go.TextBlock,
              textStyle('headOf'),
              new go.Binding('text', 'headOf', function (head) {
                return '' + head;
              }),
              new go.Binding('margin', 'headOf', function () {
                return mt8;
              }), // some space above if there is also a headOf value
            ),
          ),
        ),
      );

      // define the Link template, a simple orthogonal line
      this.myDiagram.linkTemplate = $(
        go.Link,
        { routing: go.Link.Orthogonal, corner: 15, selectable: false },
        $(go.Shape, { strokeWidth: 3, stroke: '#424242' }),
        $(go.Shape, { toArrow: 'Standard', fill: '#424242', stroke: null }),
        $(
          go.TextBlock,
          { stroke: 'red', font: '20px' }, //线条上字体
          new go.Binding('text', 'linktext'),
        ),
      ); // dark gray, rounded corner links

      // set up the nodeDataArray, describing each person/position
      var nodeDataArray = [
        {
          key: 0,
          name: '村、社区出现病例或爆发疫情',
          nation: 'bodyguard',
          title: 'Secretary-General of the United Nations',
          headOf: '社会防控工作流程图',
        },
        {
          key: 1,
          boss: '0',
          name: '县疾控中心',
          nation: 'Seychelles',
          title: 'Vice Chairman of the Committee on Confidentiality',
          headOf: '社会防控工作流程图',
        },
        {
          key: 2,
          boss: 1,
          name: '组织动员',
          nation: 'Ireland',
          title: 'Under-Secretary-General for Legal Affairs and United Nations Legal Counsel',
          headOf: '社会防控工作流程图',
        },
        {
          key: 3,
          boss: 1,
          name: '健康教育',
          nation: 'bodyguard',
          headOf: '社会防控工作流程图',
        },
        {
          key: 4,
          boss: 1,
          name: '信息告知',
          nation: 'Denmark',
          title: 'Assistant Secretary-General for Legal Affairs',
          headOf: '社会防控工作流程图',
        },

        {
          key: 5,
          boss: 1,
          name: '疫区返回人员管理',
          nation: 'Argentina',
          title: 'General Legal Division Director',
          headOf: '社会防控工作流程图',
        },

        {
          key: 6,
          boss: 1,
          name: '环境卫生治理',
          nation: 'CzechRepublic',
          title: 'Codification Division Director',
          headOf: '社会防控工作流程图',
        },

        {
          key: 7,
          boss: 1,
          name: '物资保障',
          nation: 'Russia',
          title: 'Division for Ocean Affairs and the Law of the Sea Director',
          headOf: '社会防控工作流程图',
        },
        {
          key: 12,
          boss: 1,
          name: '密切接触者管理',
          nation: 'Brazil',
          title: 'Chairman of the Commission on the Limits of the Continental Shelf',
          headOf: '社会防控工作流程图',
        },
        {
          key: 17,
          boss: 1,
          name: '加强消毒',
          nation: 'Ireland',
          title: 'Chairman of the Committee on Confidentiality',
          headOf: '社会防控工作流程图',
        },
        {
          key: 32,
          boss: 5,
          name: '摸排登记、自我隔离',
          nation: 'Japan',
          title: 'Vice Chairman of the Committee on Confidentiality',
          headOf: '社会防控工作流程图',
        },
        {
          key: 33,
          boss: 5,
          name: '每天2次体温测量',
          nation: 'Argentina',
          title: 'Member of the Committee on Confidentiality',
          headOf: '社会防控工作流程图',
        },
        {
          key: 34,
          boss: 12,
          name: '实行居家隔离',
          nation: 'Russia',
          title: 'Member of the Committee on Confidentiality',
          headOf: '社会防控工作流程图',
        },
        {
          key: 18,
          boss: 12,
          name: '场所消毒',
          nation: 'Australia',
          title: 'Chairman of the Committee on provision of scientific and technical advice to coastal States',
          headOf: '社会防控工作流程图',
        },
        {
          key: 35,
          boss: 12,
          name: '每天2次体温测量',
          nation: 'Cameroon',
          headOf: '社会防控工作流程图',
        },
        {
          key: 36,
          boss: 12,
          name: '生活垃圾',
          nation: 'India',
          headOf: '社会防控工作流程图',
        },
        {
          key: 37,
          boss: 12,
          name: '出现症状',
          nation: 'TrinidadAndTobago',
          headOf: '社会防控工作流程图',
        },
        {
          key: 38,
          boss: 17,
          name: '疫点终末消毒',
          nation: 'Romania',
          headOf: '社会防控工作流程图',
        },
        {
          key: 19,
          boss: 17,
          name: '疫点日常消毒',
          nation: 'Nigeria',
          headOf: '社会防控工作流程图',
        },
        {
          key: 20,
          boss: 32,
          name: '村、社区',
          nation: 'Norway',
          headOf: '社会防控工作流程图',
        },
        {
          key: 21,
          boss: 33,
          name: '乡镇卫生院',
          nation: 'SouthKorea',
          headOf: '社会防控工作流程图',
        },
        {
          key: 22,
          boss: 21,
          name: '定点医院就医',
          nation: 'Malaysia',
          linktext: '出现症状',
          title: 'Chairman of the Editorial Committee',
          headOf: '社会防控工作流程图',
        },
        {
          key: 23,
          boss: 34,
          name: '村、社区',
          nation: 'Mexico',
          title: 'Chairman of the Training Committee',
          headOf: '社会防控工作流程图',
        },
        {
          key: 24,
          boss: 18,
          name: '家庭消毒',
          nation: 'Mauritius',
          headOf: '社会防控工作流程图',
        },
        {
          key: 25,
          boss: 35,
          name: '乡镇卫生院',
          nation: 'Georgia',
          headOf: '社会防控工作流程图',
        },
        {
          key: 26,
          boss: 36,
          name: '村收集',
          nation: 'China',
          headOf: '社会防控工作流程图',
        },
        {
          key: 27,
          boss: 37,
          name: '报疾控中心',
          nation: 'Ghana',
          headOf: '社会防控工作流程图',
        },
        {
          key: 28,
          boss: 27,
          name: '按规定转诊就医',
          nation: 'Portugal',
          headOf: '社会防控工作流程图',
        },
        {
          key: 8,
          boss: 19,
          name: '村、社区、乡村医生',
          nation: 'Netherlands',
          title: 'Treaty Section Chief',
          headOf: '社会防控工作流程图',
        },
        {
          key: 14,
          boss: 26,
          name: '专人运送到暂存点',
          nation: 'UnitedStates',
          title: 'Substantive Legal Issues Head',
          headOf: '社会防控工作流程图',
        },

        {
          key: 15,
          boss: 14,
          name: '乡镇卫生院消毒处置',
          nation: 'Russia',
          title: 'Technical/Legal Issues Head',
          headOf: '社会防控工作流程图',
        },
      ];

      // create the Model with data for the tree, and assign to the Diagram
      this.myDiagram.model = $(go.TreeModel, {
        nodeParentKeyProperty: 'boss', // this property refers to the parent node data
        nodeDataArray: nodeDataArray,
      });

      // Overview
      $(
        go.Overview,
        'myOverviewDiv', // the HTML DIV element for the Overview
        { observed: this.myDiagram, contentAlignment: go.Spot.Center },
      );
    },
    searchDiagram() {
      var input = document.getElementById('mySearch');
      if (!input) return;
      input.focus();

      this.myDiagram.startTransaction('highlight search');

      if (input.value) {
        var regex = new RegExp(input.value, 'i');
        var results = this.myDiagram.findNodesByExample({ name: regex });
        this.myDiagram.highlightCollection(results);
        if (results.count > 0) this.myDiagram.centerRect(results.first().actualBounds);
      } else {
        this.myDiagram.clearHighlighteds();
      }

      this.myDiagram.commitTransaction('highlight search');
    },
  },
};
</script>

<style scoped lang="scss">
#sample {
  position: relative;
  height: calc(100vh - 100px);
}
#myDiagramDiv {
  height: inherit;
  width: 100%;
  box-sizing: border-box;
}
#mySearch {
  width: 75%;
}
.search {
  position: absolute;
  width: 200px;
  height: 40px;
  top: 120px;
  left: 10px;
  background-color: #f2f2f2;
  z-index: 300; /* make sure its in front */
  border: solid 1px #7986cb;
  display: inline-flex;
}
#myOverviewDiv {
  position: absolute;
  width: 200px;
  height: 100px;
  top: 10px;
  left: 10px;
  background-color: #f2f2f2;
  z-index: 300; /* make sure its in front */
  border: solid 1px #7986cb;
}
</style>
