import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface BookmarkButtonProps {
    isBookmarked: boolean;
    onClick: () => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ isBookmarked, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
            {isBookmarked ? (
                <BookmarkCheck className="text-blue-600" size={22} />
            ) : (
                <Bookmark className="text-gray-500" size={22} />
            )}
        </button>
    );
};

export default BookmarkButton;
