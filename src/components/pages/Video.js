import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../features/api/apiSlice";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";

export default function Video() {
  const { videoId } = useParams();
  const { data, isError, isLoading, error } = useGetVideoQuery(videoId);

  let content = null;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <p>{error.message}</p>;
  if (!isLoading && !isError && !data.id === 0)
    content = <p>No videos found</p>;
  if (!isLoading && !isError && data.id) {
    content = (
      <>
        <Player link={data?.link} title={data?.title} />
        <Description data={data} />
      </>
    );
  }
  return (
    <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            {content}
          </div>
          {data?.id && <RelatedVideos id={data.id} title={data.title} />}
        </div>
      </div>
    </section>
  );
}
