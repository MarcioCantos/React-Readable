import React from 'react'
import { connect } from 'react-redux'

const Post = ({post}) => {
  return (
    <div>
      <p>
        título: {post.title}
      </p>
      <p>
        autor: {post.author}
      </p>
      <p>
        autor: {post.author}
      </p>
      <p>/
        texto: {post.body}
      </p>
      <p>
        categoria: {post.category}
      </p>
      <p>
        qtd. Comentários: {post.commentCount}
      </p>
      <p>
        Score: {post.voteScore}
      </p>
      <p>
        timestamp: {post.timestamp}
      </p>
    </div>
  )
}

const mapStateToProps = (store, {id} ) => {
  const post = store.posts.posts[id];
  console.log(post)
  return {
    post
  }
}

export default connect(mapStateToProps)(Post)

// author: "thingone"
// body: "Just kidding. It takes more than 10 minutes to learn technology."
// category: "redux"
// commentCount: 0
// deleted: false
// id: "6ni6ok3ym7mf1p33lnez"
// timestamp: 1468479767190
// title: "Learn Redux in 10 minutes!"
// voteScore: -5