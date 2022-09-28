export function repeat(arr:any[],count:number){
  let res:any[]=[]
  for(let i=0;i<count;i++){
     res=res.concat(arr)
  }
  return res
}