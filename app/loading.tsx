const Loading = () => {
  return (
    <main className='p-4'>
      <div className='h-10 w-40 bg-muted rounded animate-pulse mb-6' />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='rounded-border p-4 space-y-3'>
            <div className='h-4 w-24 bg-muted rounded animate-pulse' />
            <div className='h-6 w-3/4 bg-muted rounded animate-pulse' />
            <div className='h-4 w-1/2 bg-muted rounded animate-pulse' />
            <div className='h-8 w-full bg-muted rounded animate-pulse' />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Loading;



