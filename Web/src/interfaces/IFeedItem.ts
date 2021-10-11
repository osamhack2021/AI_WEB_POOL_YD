import { IPostDisplay } from "@/interfaces/IDatabaseData";

export default interface IFeedItem {
  postInfo: IPostDisplay,
  likedByAccount: boolean,
} // eslint-disable-line semi
