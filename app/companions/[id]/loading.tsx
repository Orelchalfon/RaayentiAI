const Loading = () => {
  return (
    <main>
      <article className='flex rounded-border justify-between p-6 max-md:flex-col'>
        <div className='flex items-center gap-2'>
          <div className='size-[72px] rounded-lg bg-muted animate-pulse max-md:hidden' />
          <div className='flex flex-col gap-2'>
            <div className='h-6 w-48 bg-muted rounded animate-pulse' />
            <div className='h-5 w-64 bg-muted rounded animate-pulse' />
          </div>
        </div>
        <div className='h-6 w-24 bg-muted rounded animate-pulse max-md:hidden' />
      </article>
      <div className='mt-6 rounded-border p-6 space-y-4'>
        <div className='h-10 w-full bg-muted rounded animate-pulse' />
        <div className='h-40 w-full bg-muted rounded animate-pulse' />
        <div className='h-10 w-full bg-muted rounded animate-pulse' />
      </div>
    </main>
  );
};

export default Loading;



