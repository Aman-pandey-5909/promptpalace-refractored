import PromptPage from "@/pages/prompt/PromptPage";

export default async function DetailedPrompt({ params }: any) {
    const {id} = await params
  return <PromptPage id={id} />;
}
