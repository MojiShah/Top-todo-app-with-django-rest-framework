import TodoDetail from "@/components/TodoDetail";

interface ITodoDetailPageProps{
    params : Promise<{id:string}>
}

 
export default async function TodoDetailPage({params}:ITodoDetailPageProps) {
    const {id} = await params;
  return (
    <div className="w-9/10 h-auto mx-auto my-20 p-10 rounded-4xl shadow-2xl">
        <TodoDetail id={+id}/>
    </div>
  )
}
