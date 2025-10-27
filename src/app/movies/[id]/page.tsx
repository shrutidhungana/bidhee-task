import DetailPageClient from "./DetailPageClient";


interface DetailPageProps {
  params: {
    id: string;
  };
}

// Server Component wrapper
const DetailPage = ({ params }: DetailPageProps) => {
  // params are resolved in server components
  return <DetailPageClient movieId={Number(params.id)} />;
};

export default DetailPage;
