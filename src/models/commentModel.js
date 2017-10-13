import Requester from './requestModel'
import Kinvey from '../services/kinveyService'
import AuthenticationService from '../services/authenticationService'
import observer from './observer'

let requester = new Requester()
let kinvey = new Kinvey()
let auth =
    new AuthenticationService(kinvey.getKinveyAppKey(), kinvey.getKinveySecret())

export default class Comment {
    /*constructor(){
     this.bindEventHandlers()
     }*/

    // bindEventHandlers() {
    //    this.initializeRating = this.initializeRating.bind(this)
    //    this.deleteRating = this.deleteRating.bind(this)
    // }
    createComment(text, postId, author, callback) {
        let commentData = {text, postId, author}
        requester.post(kinvey.getCollectionModuleUrl('comments'), auth.getHeaders(), commentData)
            .then(createCommentSuccess)
        function createCommentSuccess(commentInfo) {
            observer.showSuccess('Comment created')
            callback(true)
        }
    }

    deleteComment(commentId, callback) {
        requester.delete(kinvey.getCollectionModuleUrl('comments') + '/' + commentId, auth.getHeaders())
            .then(() => {
                observer.showSuccess('Comment deleted.')
                callback(true, commentId)
            })
    }

    getPostComments(postId, callback) {
    	if (callback === undefined)
    		return requester.get(kinvey.getCollectionModuleUrl('comments') + `?query={"postId":"${postId}"}`, auth.getHeaders())

	    requester.get(kinvey.getCollectionModuleUrl('comments') + `?query={"postId":"${postId}"}`, auth.getHeaders())
		    .then((comments) => {
    		callback(comments);
		    observer.showSuccess('Comments loaded');
    	});
    }

    loadCommentDetails(commentId,onPostSuccess){
        requester.get(kinvey.getCollectionModuleUrl('comments')+'/'+commentId,auth.getHeaders())
            .then(onPostSuccess);
    }

    editComment(commentId,text,postId,author, callback) {
        let commentData = {
            text: text,
            postId:postId,
            author:author
        };
        requester.put(kinvey.getCollectionModuleUrl('comments') + '/' + commentId, auth.getHeaders(), commentData)
            .then(callback(true))
    }

    deleteCommentsByPostId(postId,callback){
        requester.delete(kinvey.getCollectionModuleUrl('comments')+`?query={"postId":"${postId}"}`,auth.getHeaders())
            .then(callback(true));
    }
}