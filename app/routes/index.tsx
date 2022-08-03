import { Button } from "~/components/button";
import LinkItem from "~/components/linkitem";

export default function Index() {
  return (
    <div className="flex-auto w-screen h-screen bg-skin-main">
      <nav className="w-screen h-10 bg-skin-bold shadow-md">
        <LinkItem
          title="Go To Home Page"
          to="/home"
          linkIcon="BsFillLaptopFill"
        />
      </nav>

      <h1 className="text-3xl text-skin-base">Hello world! BASE</h1>
      <h1 className="text-3xl text-skin-muted">Hello world! MUTED</h1>
      <h1 className="text-3xl text-skin-bold">Hello world! BOLD</h1>
      <h1 className="text-3xl text-skin-warning">Hello world! WARNING</h1>

      <div className="grid w-screen p-4 items-center">
        <Button btnSkin="main" textSkin="bold" btnLabel="Main Button" />
        <Button btnSkin="muted" textSkin="base" btnLabel="Muted Button" />
        <Button btnSkin="warning" textSkin="bold" btnLabel="Warning Button" />
        <Button
          btnSkin="main"
          textSkin="bold"
          btnLabel="Mantap"
          btnIcon="BsFillEmojiHeartEyesFill"
          name="btnmainwithicon"
          onClick={(e) => alert("Mantap")}
        />
        <Button
          btnSkin="muted"
          textSkin="base"
          btnLabel="Terlalu"
          btnIcon="BsFillEmojiExpressionlessFill"
          name="btnmutedwithicon"
          onClick={(e) => alert("Terlalu")}
          disabled={true}
        />
        <Button
          btnSkin="warning"
          textSkin="bold"
          btnLabel="Awas Kambing Galak !!!"
          btnIcon="BsFillEmojiAngryFill"
          name="btnwarningwithicon"
          onClick={(e) => alert("ble ble ble")}
        />
        <Button btnSkin="none" textSkin="base" btnLabel="Skin None" />
      </div>
    </div>
  );
}
