<template>
    <div v-if="issue" class="blog-detail-container">
        <div class="title-container">
            <span class="back" @click="back">
                <img src="../assets/back-icon.svg" class="back-icon">返回
            </span>
            <span class="title">{{issue.title}}</span>
            <ul>
                <li class="tag tag-small" v-for="label in issue.labels" :key="label.id" @click="setActiveLabel(label)" :style="{ backgroundColor: '#' + label.color}">{{label.name}}
                </li>
            </ul>

        </div>
        <div class="comment-container bga-back-top" ref="commentContainer">
            <comment :comment="issue" />
            <comment v-for="comment in comments" :key="comment.id" :comment="comment" />
            <add-comment :commentsUrl="issue.comments_url" @addCommentSuccess="handleAddCommentSuccess" />
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import Comment from "../components/Comment.vue";
import AddComment from "../components/AddComment.vue";

export default {
    data() {
        return {
            issue: null,
            number: null,
            comments: [],
            newComment: null
        };
    },
    components: { Comment, AddComment },
    methods: {
        ...mapActions(["updateActiveLabel", "setWebMeta"]),
        setActiveLabel(label) {
            this.updateActiveLabel(label);
            this.$router.push("/");
        },
        getComments() {
            if (this.issue && this.issue.comments > 0) {
                this.$gitHubApi
                    .getComments(this, this.issue.comments_url)
                    .then(response => {
                        this.comments = response.data;
                    });
            }
        },
        getIssue() {
            this.$gitHubApi.getIssue(this, this.number).then(response => {
                this.issue = response.data;
                console.log(this.issue.title)
                this.getComments();
            });
        },
        back() {
            this.$router.go(-1);
        },
        handleAddCommentSuccess(comment) {
            this.comments.push(comment);
            this.$nextTick(() => {
                // 如果这里不加个 setTimeout 的话，Comment 数量太多时不会自动滚动到底部
                setTimeout(() => {
                    let commentContainer = this.$refs.commentContainer;
                    commentContainer.scrollTop =
                        commentContainer.scrollHeight -
                        commentContainer.clientHeight;
                }, 16);
            });
        }
    },
    created() {
        if (this.$route.params.issue) {
            this.issue = this.$route.params.issue;
        } else {
            if (this.$route.params.number) {
                this.number = this.$route.params.number;
            } else {
                this.$router.replace("/");
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.issue) {
                console.log(this.issue.title);
                this.getComments();
            } else {
                this.getIssue();
            }
        });
    },
    watch: {
        issue: {//深度监听，可监听到对象、数组的变化
            handler(val, oldVal) {
                console.log(this.issue)
                let keywords = "";
                this.issue.labels.map(function (item) {
                    keywords += `,${item.name}`;
                });
                let description = this.issue.body_html;
                description = description.replace(/<pre>.*?<\/pre>/ig, "")//过滤代码
                description = description.replace(/[\r\n\ ]/g, "") //去掉换行空格
                // description = description.replace(/[a-z0-9]/g, "");//去掉字母和数字
                description = description.replace(/<[^>]*>|/g, "")//去掉标签
                description = description.substring(0, 145) + '...'
                console.log(description)
                let blogDetailObj = {
                    title: this.issue.title,
                    keywords: `${this.issue.title}${keywords}`,
                    description: description
                }
                this.setWebMeta(blogDetailObj);
            },
            deep: true
        }
    }
};
</script>
