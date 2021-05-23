<template>
	<div>
  <el-button @click="resetDateFilter">清除日期过滤器</el-button>
  <el-button @click="clearFilter">清除所有过滤器</el-button>
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="title"
      label="题目名称"
      width="180"
      column-key="date"
    >
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"
      width="100"
      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '家' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="judgement"
      label="评判"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="interview"
      label="面试场次"
      :formatter="formatter">
    </el-table-column>
	<el-table-column
	  prop="position"
	  label="岗位"
	  width="100"
	  :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
	  :filter-method="filterTag"
	  filter-placement="bottom-end">
	  <template slot-scope="scope">
	    <el-tag
	      :type="scope.row.tag === '家' ? 'primary' : 'success'"
	      disable-transitions>{{scope.row.tag}}</el-tag>
	  </template>
	</el-table-column>
	<el-table-column
	  prop=""
	  label="时间"
	  sortable="true"
	  :formatter="formatter">
	</el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }]
      }
    },
    methods: {
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    }
  }
</script>