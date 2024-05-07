import { Lang } from "@/types";

export const LangSwitcher = (props: {onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; currentLang: Lang}) => {
  const { onChange, currentLang } = props;

  return (
    <>
      <select className="block w-fit" value={currentLang} onChange={onChange}>
        <option value="en">English (US)</option>
        <option value="zh">繁體中文（香港）</option>
        <option value="ja-JP">日本語</option>
      </select>
    </>
  )
}