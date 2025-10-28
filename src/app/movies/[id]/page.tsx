import DetailPageClient from "./DetailPageClient";


interface DetailPageProps {
  params: {
    id: string;
  };
}

const DetailPage = ({ params }: DetailPageProps) => {
  
  return <DetailPageClient movieId={Number(params.id)} />;
};

export default DetailPage;
