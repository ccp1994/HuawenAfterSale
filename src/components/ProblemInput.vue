<template>
  <div>
    <Header :show-back="true" :show-right="false" title="华文售后录入"/>
    <el-scrollbar>

      <el-form :inline="true" class="form-post" v-loading="loading">
        <el-input v-model="problem_title" placeholder="请输入售后标题" clearable></el-input>
        <el-input
          style="margin-top:10px;"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8}"
          placeholder="请输入问题描述"
          v-model="problem_content"></el-input>

        <el-upload
          style="margin-top:10px;"
          action="https://app.fitoneapp.com/panel/welcome/upload_after_sale_image/upload"
          list-type="picture-card"
          name="file"
          :on-preview="handlePictureCardPreview"
          :on-success="handlePictureSuccess"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

        <el-button type="primary" class="confirm" @click="confirm">确认</el-button>

      </el-form>
    </el-scrollbar>

  </div>
</template>

<script>
  import Header from '@/components/ui/Header.vue'
  import {addProblem} from '@/server/problem.js';


  export default {
    name: 'ProblemInput',
    data() {
      return {
        problem_title: '',
        problem_content: '',
        dialogImageUrl: '',
        dialogVisible: false,
        image_post_data: [],
        imageUrls: [],
        loading: false
      }
    },
    methods: {
      async confirm() {
        if (this.problem_title == '') {
          this.$message('请输入售后标题');
          return;
        }
        if (this.problem_content == '') {
          this.$message('请输入问题描述');
          return;
        }
        let imageUrlStr = '';
        if (this.imageUrls.length > 0) {
          this.imageUrls.forEach(function (item, key) {
            imageUrlStr += item + ',';
          });
          imageUrlStr = imageUrlStr.substring(0, imageUrlStr.length - 1);
          this.imageUrls = imageUrlStr;
        }
        this.loading = true;
        let _data = await addProblem(
          {'title': this.problem_title, 'content': this.problem_content, 'images': imageUrlStr},
        );
        this.loading = false;
        this.$message(_data.message);
        if (_data.code === 1) {
          setTimeout(function () {
            window.location.reload()
          }, 1000);
        }
        console.log(_data)
      },
      handleRemove(file, fileList) {
        console.log('handleRemove', fileList)
        let imageUrls = [];
        for (let i = 0; i < size; i++) {
          let url = fileList[i].response.data.url;
          imageUrls.concat(url);
        }
        this.imageUrls = imageUrls;
      },
      handlePictureSuccess(file) {
        let url = file.data.url;
        this.imageUrls = this.imageUrls.concat(url);
        // console.log('handlePictureSuccess',file,'urls:',this.imageUrls)

        this.fixImageItemSize();
      },
      handlePictureCardPreview(file) {
        console.log('uploadSuccess', file)
        this.dialogImageUrl = file.response.data.url;
        this.dialogVisible = true;
      },
      fixImageItemSize() {
        let uploaderLi = document.getElementsByClassName("el-upload-list__item");
        console.log(uploaderLi)
        if (uploaderLi) {
          let size = uploaderLi.length;
          for (let i = 0; i < size; i++) {
            uploaderLi[i].style = "width:80px;height:80px;line-height:80px;";
          }
        }
      }

    },
    mounted() {
      let el = document.getElementsByClassName("el-upload--picture-card");
      if (el) {
        let uploader = el[0];
        uploader.style = "width:80px;height:80px;line-height:80px;";
      }

    },
    components: {
      Header
    }
  }
</script>

<style scoped>
  .uploader {
  }

  .form-post {
    padding: 10px;

  }

  .confirm {
    margin-top: 10px;
    width: 100%;
  }
</style>
