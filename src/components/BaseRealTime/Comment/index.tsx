import React, { Suspense, useState, useEffect, useRef } from "react";
import RotateLoadding from "../../Loadding/RotateLoadding";

import "./Comment.scss";

const CommentContainer = React.lazy(() => import("./CommentContainer"));
const HeaderComment = React.lazy(() => import("./HeaderComment"));
const UserComment = React.lazy(() => import("./UserComment"));

const Comment = () => {
  const divRef = useRef(null);
  const [isOpenChat, setIsOpenChat] = useState(false);
  useEffect(() => {
    const callback = (entries: any[], observer: any) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsOpenChat(() => true);
          observer.unobserve(entry.target);
        }

        // Each entry describes an intersection change for one observed
        // target element:
        //   entry.boundingClientRect
        //   entry.intersectionRatio
        //   entry.intersectionRect
        //   entry.isIntersecting
        //   entry.rootBounds
        //   entry.target
        //   entry.time
      });
    };
    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });
    divRef.current && observer.observe(divRef.current);
  }, []);

  return (
    <div ref={divRef} className="bg-content wapper">
      {isOpenChat && (
        <Suspense fallback={<RotateLoadding />}>
          <div className="px-4 pt-4">
            <UserComment />
          </div>
          <HeaderComment />
          <CommentContainer />
        </Suspense>
      )}
    </div>
  );
};

export default Comment;
