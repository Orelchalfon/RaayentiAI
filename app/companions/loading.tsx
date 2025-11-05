const Loading = () => {
  return (
    <main>
      <section className='flex justify-between gap-4 max-sm:flex-col'>
        <div className='h-10 w-64 bg-muted rounded animate-pulse' />
        <div className='flex gap-4'>
          <div className='h-10 w-48 bg-muted rounded animate-pulse' />
          <div className='h-10 w-48 bg-muted rounded animate-pulse' />
        </div>
      </section>
      <section className='companions-grid mt-4'>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className='companion-card p-4'>
            <div className='h-4 w-24 bg-muted rounded animate-pulse mb-2' />
            <div className='h-6 w-3/4 bg-muted rounded animate-pulse mb-2' />
            <div className='h-4 w-1/2 bg-muted rounded animate-pulse mb-4' />
            <div className='h-8 w-full bg-muted rounded animate-pulse' />
          </div>
        ))}
      </section>
    </main>
  );
};

export default Loading;



