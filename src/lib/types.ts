export interface Notif {
    id?: number;
    title: string;
    content?: string;
    type?: ""
    description?: string;
    senderId?: number;
    receiverId?: number;
    parentId?: number;
    createdAt?: Date;
    isRead?: boolean;
    icon?: string;
}

export interface User {
  id?: number;
  name: string,
  isLive?: boolean;
  streams?: Stream[];
  avatarUrl: string;
  createdAt?: string;
  followersCount?: number;
  viewsPerStreamCount?: number;
}

export interface Message {
  id: number;
  user: User;
  timestamp: string;
  content: string;
}

export interface Stream {
  id: number;
  streamer: User;
  title: string;
  info?: string;
  thumbnail: string;
  viewerCount: number;
  duration: string;
  isLive: boolean;
  topic: string;
  ingressId?: string;
  serverUrl?: string;
  streamKey?: string;
}

export type streamViewType = "userView" | "streamerView";
