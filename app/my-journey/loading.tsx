const Loading = () => {
  return (
    <main className='min-lg:w-3/4'>
      <section className='flex justify-between gap-4 max-sm:flex-col items-center'>
        <div className='flex items-center gap-4'>
          <div className='rounded-full bg-muted w-[95px] h-[95px] animate-pulse' />
          <div className='flex flex-col gap-2'>
            <div className='h-6 w-48 bg-muted rounded animate-pulse' />
            <div className='h-4 w-64 bg-muted rounded animate-pulse' />
          </div>
        </div>
        <div className='flex gap-4'>
          <div className='border border-black rounded-lg p-3 gap-2 flex flex-col h-fit w-40'>
            <div className='h-4 w-16 bg-muted rounded animate-pulse' />
            <div className='h-3 w-24 bg-muted rounded animate-pulse' />
          </div>
          <div className='border border-black rounded-lg p-3 gap-2 flex flex-col h-fit w-40'>
            <div className='h-4 w-16 bg-muted rounded animate-pulse' />
            <div className='h-3 w-24 bg-muted rounded animate-pulse' />
          </div>
        </div>
      </section>
      <div className='mt-6 space-y-4'>
        <div className='h-10 w-full bg-muted rounded animate-pulse' />
        <div className='h-40 w-full bg-muted rounded animate-pulse' />
        <div className='h-10 w-full bg-muted rounded animate-pulse' />
        <div className='h-40 w-full bg-muted rounded animate-pulse' />
        <div className='h-10 w-full bg-muted rounded animate-pulse' />
        <div className='h-40 w-full bg-muted rounded animate-pulse' />
      </div>
    </main>
  );
};

export default Loading;


