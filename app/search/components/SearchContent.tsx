"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface SearchContentProps {
    songs: Song[];
}


const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
    const onPlay = useOnPlay(songs);
    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">no songs found</div>
        )
    }
    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((s) => (
                <div key={s.id} className="flex items-center gap-x-4 w-full">
                    <div className="flex-1">
                        <MediaItem onClick={(id: string) => { onPlay(id) }} data={s} />
                    </div>
                    <LikeButton songId={s.id} />
                </div>
            ))}
        </div>
    );
}

export default SearchContent;