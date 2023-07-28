"use client";

import SongItem from "@/components/SongItem";
import { Song } from "@/types";

interface pageContentProps {
    songs: Song[];
}

const PageContent: React.FC<pageContentProps> = ({ songs }) => {
    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                no songs available
            </div>
        )
    }
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
            {songs.map(song => <SongItem key={song.id} onClick={() => { }} song={song} />)}
        </div>
    );
}

export default PageContent;