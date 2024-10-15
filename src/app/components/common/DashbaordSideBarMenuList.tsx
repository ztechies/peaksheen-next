import Image from "next/image"
import { StaticImageData } from "next/image"

interface MenuItem {
    icon: StaticImageData // Adjust this type based on your icons
    name: string
    id: number
    path?: string
    isactive: string
}

const SideBarMenuList = (props: { menu: MenuItem[] }) => {
    return (
        <ul>
            {props.menu.map((el) => (
                <li key={el.id}>
                    <div className={`navItem ${el.isactive}`}>
                        <Image src={el.icon} alt={`${el.name} Icon`} className="navIcon" />
                        {el.name}
                    </div>
                </li>
            ))}
        </ul>
    )
}
export default SideBarMenuList
