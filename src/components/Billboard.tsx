import useBillboard from "@/hooks/useBillboard"

import BillboardInfo from "@/components/BillboardInfo";

function Billboard() {
    // { id, title, description, thumbnailUrl, videoUrl}
    const { data } = useBillboard();
    return (
        <div className="relative h-[56.25vw]">
            <video className="w-full h-[56.25vw] object-cover brightness-[60%]" poster={data?.thumbnailUrl} src={data?.videoUrl} autoPlay muted loop></video>
            <BillboardInfo id={data?.id} title={data?.title} description={data?.description} />
        </div>
    )
}
export default Billboard