export interface IUserDisplay {
  /* 뷰 표시용을 겸한 사용자 최소 정보 */
  id: string,
  username: string,
  profileImageUrl: string,
}

export interface IUser extends IUserDisplay {
  /* 사용자 전체 정보 */
  createdAt: Date,
  confirmed: boolean,
  blocked: boolean,
  followings: Array<IUserDisplay>,
  followers: Array<IUserDisplay>,
  publishedPostIds: Array<number>,
  likedPostIds: Array<number>,
}

export interface IComment {
  /* 댓글 정보 */
  id: string,
  createdAt: Date,
  updatedAt: Date,
  author: Array<IUserDisplay>,
  content: string,
}

export interface IPostDisplay {
  /* 뷰(피드) 표시용을 겸한 최소 게시글 정보 */
  id: string,
  postType: "general" | "recruition",
  createdAt: Date,
  author: IUserDisplay,
  title: string,
  contentPreview: string,
  previewMainImageUrl?: string,
  tags: Array<string>,
  commentsCount: number,
  likesCount: number,
}

export interface IPost extends IPostDisplay {
  /* 게시글 정보 */
  updatedAt: Date,
  contentFull: string,
  comments: Array<IComment>,
  likes: Array<IUserDisplay>,
}
