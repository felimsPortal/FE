"use client";

import React, { useCallback, useEffect, useState } from "react";

export const useDotButton = (emblaApi, slidesPerGroup = 5) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [groupedScrollSnaps, setGroupedScrollSnaps] = useState([]);

  const onDotButtonClick = useCallback(
    (index) => {
      if (!emblaApi) return;
      const groupIndex = index * slidesPerGroup;
      emblaApi.scrollTo(groupIndex);
    },
    [emblaApi, slidesPerGroup]
  );

  const onInit = useCallback(
    (emblaApi) => {
      const allSnaps = emblaApi.scrollSnapList();
      const groupedSnaps = [];
      for (let i = 0; i < allSnaps.length; i += slidesPerGroup) {
        groupedSnaps.push(allSnaps[i]);
      }
      setScrollSnaps(allSnaps);
      setGroupedScrollSnaps(groupedSnaps);
    },
    [slidesPerGroup]
  );

  const onSelect = useCallback(
    (emblaApi) => {
      const snapIndex = Math.floor(
        emblaApi.selectedScrollSnap() / slidesPerGroup
      );
      setSelectedIndex(snapIndex);
    },
    [slidesPerGroup]
  );

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps: groupedScrollSnaps,
    onDotButtonClick,
  };
};

export const DotButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};
