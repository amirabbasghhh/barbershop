import Skeleton from '@mui/material/Skeleton';

const BarberSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 gap-4 py-5 px-10">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="p-4 border rounded-lg shadow-md">
          <Skeleton variant="rectangular" width="100%" height={150} animation="wave" />
          <Skeleton variant="text" width="80%" height={30} animation="wave" className="mt-2" />
          <Skeleton variant="text" width="60%" height={20} animation="wave" />
        </div>
      ))}
    </div>
  );
};
export default BarberSkeleton