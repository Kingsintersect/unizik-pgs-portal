import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { cn } from '@/lib/utils';

interface CarouselItem {
    title: string;
    condition: "ACTIVE" | "INACTIVE";
    checked?: boolean;
    onClick?: () => void;
}
interface CarouselSliderProps extends React.HTMLAttributes<HTMLDivElement> {
    options: Record<string, any>;
    menu: CarouselItem[];
    contentClassName?: string;
    children?: React.ReactNode;
    orientation?: "horizontal" | "vertical";
}

const CarouselSlider: React.FC<CarouselSliderProps> = ({
    className,
    contentClassName,
    options,
    menu = [],
    children,
    orientation = "horizontal",
}) => {    
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }
    
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
    
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api]);

    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )
    
    return (
        <div className="mx-auto max-w-xs">
            <Carousel
                setApi={setApi}
                opts={options}
                orientation={orientation}
                className={cn("w-full max-w-sm", className)}
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {menu.map((item, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className={cn("flex aspect-square items-center justify-center p-6", contentClassName)}>{children}
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            {current&&<div className="py-2 text-center text-sm text-muted-foreground">
                Slide {current} of {count}
            </div>}
        </div>
    )
}

export default CarouselSlider







/**
 * REVIEW THE CODE BELOW
 * IT SHOULD REPLACE THE CODE I HAVE ABOVE
 * 
 * 
 * 
 */
// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   type CarouselApi,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";
// import { cn } from "@/lib/utils";

// interface CarouselItem {
//   title: string;
//   condition: "ACTIVE" | "INACTIVE";
//   checked?: boolean;
//   onClick?: () => void;
// }

// interface CarouselSliderProps extends React.HTMLAttributes<HTMLDivElement> {
//   options?: Record<string, any>;
//   menu: CarouselItem[];
//   contentClassName?: string;
//   children?: (item: CarouselItem) => React.ReactNode;
//   orientation?: "horizontal" | "vertical";
// }

// const CarouselSlider: React.FC<CarouselSliderProps> = ({
//   className,
//   contentClassName,
//   options = {},
//   menu = [],
//   children,
//   orientation = "horizontal",
// }) => {
//   const [api, setApi] = React.useState<CarouselApi>();
//   const [current, setCurrent] = React.useState(0);
//   const [count, setCount] = React.useState(0);

//   React.useEffect(() => {
//     if (!api) return;

//     setCount(api.scrollSnapList().length);
//     setCurrent(api.selectedScrollSnap() + 1);

//     api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
//   }, [api]);

//   const plugin = React.useRef(
//     Autoplay({ delay: 3000, stopOnInteraction: true })
//   );

//   return (
//     <div className="mx-auto max-w-xs">
//       <Carousel
//         setApi={setApi}
//         opts={options}
//         orientation={orientation}
//         className={cn("w-full max-w-sm", className)}
//         plugins={[plugin.current]}
//         onMouseEnter={plugin.current.stop}
//         onMouseLeave={plugin.current.reset}
//       >
//         <CarouselContent>
//           {menu.map((item, index) => (
//             <CarouselItem key={index}>
//               <div className="p-1">
//                 <Card>
//                   <CardContent
//                     className={cn(
//                       "flex aspect-square items-center justify-center p-6",
//                       contentClassName
//                     )}
//                     onClick={item.onClick} // ✅ Calls onClick if defined
//                   >
//                     {children ? children(item) : <span>{item.title}</span>}
//                   </CardContent>
//                 </Card>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>

//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>

//       {current > 0 && (
//         <div className="py-2 text-center text-sm text-muted-foreground">
//           Slide {current} of {count}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarouselSlider;
