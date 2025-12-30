import { CommentType } from "@/pages/prompt/PromptPage";

export interface PromptCardProps {
    data: {
        _id: string;
        authorName: string;
        title: string;
        prompt: string;
        description: string;
        tags: string[];
        likes: number
        comments: CommentType[]
        createdAt: string
    }
    
}

const PromptCard = ({data}: PromptCardProps) => {
    // console.log("in prompt card: ", data);
  return (
    <div>
        <div>{data?.authorName || "Anonymous"}</div>
        <div>{data?.title || "No title"}</div>
        <div>{data?.prompt || "No prompt"}</div>
        <div>{data?.description || "No description"}</div>
        <div>{data?.tags || "No tags"}</div>
        <div>{data?.likes || "No likes"}</div>
        <div>{new Date(data?.createdAt).toLocaleDateString('en-GB') || "No date"}</div>
        
    </div>
  )
}

export default PromptCard