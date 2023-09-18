import useFetchWords from "@/hooks/fetch-data/useFetchWords"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import WordBox from "../word-store/word-box"
import { useState } from "react"
import { IResourceWord } from "@/types/resources/word"
import EditItemModal from "../word-store/edit-item-modal"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { Carousel } from "antd"

export default function Dashboard() {
    const { languageOptions } = useSelector((state: RootState) => state.app)

    const { listItems, setListItems } = useFetchWords({
        is_memory: true,
        random: true,
        limit: 10
    })

    const [selectedEditItem, setSelectedEditItem] = useState<IResourceWord>(null)

    return (
        <>
            <EditItemModal
                languageOptions={languageOptions}
                item={selectedEditItem}
                onCancel={() => setSelectedEditItem(null)}
                refetch={(item: IResourceWord) => {
                    setListItems((prev) =>
                        prev.map((it) => {
                            if (it.id === item.id) {
                                return item
                            }
                            return it
                        })
                    )
                }}
            ></EditItemModal>

            {listItems.length > 0 && (
                <div>
                    <p className="component-text-header mb-4">Từ vựng bạn cần ghi nhớ</p>
                    <ResponsiveMasonry
                        className="h-[400px] laptop:h-full overflow-auto pb-2 laptop:pb-0 laptop:pr-0 pr-2"
                        columnsCountBreakPoints={{ 0: 1, 756: 2, 1040: 4, 1900: 5 }}
                    >
                        <Masonry gutter={"16px"}>
                            {listItems.map((word) => (
                                <WordBox
                                    key={word.id}
                                    word={word}
                                    setSelectedEditItem={setSelectedEditItem}
                                    setListItems={setListItems}
                                ></WordBox>
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            )}
        </>
    )
}
