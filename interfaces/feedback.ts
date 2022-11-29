export interface FeedbackTypeInterface {
  id: string;
  title: string;
  icon: string;
}

export interface SendFeedbackBodyInterface {
  type: 'bug' | 'request' | 'feedback';
  message: string;
  image?: string | undefined;
}

export interface GitHubCreateIssueInterface {
  title: string;
  body: string;
}
