const searchDataByAuthor = (data: any,authors:string[]) => {
    if (!data) {
      return [];
    }
    const authorRegex = new RegExp(authors?.join('|'), 'i');
    return data.filter((item: any) => authorRegex.test(item?.attributes['author']));
  };
  
  const searchDataBySource = (data: any,sources:string[]) => {
    if (!data) {
      return [];
    }
    const sourceRegex = new RegExp(sources?.join('|'), 'i');
    return data.filter((item: any) => sourceRegex.test(item?.attributes['source_name']));
  };

  const keys = ['title','source','author','content','description']
  const searchData = (data:any,debouncedQuery:string)=>{
	return data?.filter((item:any)=> keys?.some((key:string)=>item?.attributes[key]?.toLowerCase()?.includes(debouncedQuery.toLowerCase())))

}

export  {
    searchDataByAuthor,
    searchDataBySource,
    searchData
}