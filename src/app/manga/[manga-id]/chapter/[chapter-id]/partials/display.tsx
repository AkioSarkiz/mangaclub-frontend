export default function Display({ frames }: any) {
  return (
    <>
      {frames.map((frame: any, index: number) => (
        <div key={frame.id}>
          <img src={frame.image} alt={`frame ${index}`} className='mx-auto' />
        </div>
      ))}
    </>
  );
}
