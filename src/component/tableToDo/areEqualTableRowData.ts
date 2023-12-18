function shallowDiffers(prev, next) {
  for (const attribute in prev) {
    if (attribute === "top") {
      console.log(prev[attribute], next[attribute]);
    }

    if (!(attribute in next)) {
      console.log("нет атрибута", attribute);
      return true;
    }
  }
  for (const key in next) {
    if (key === "data") {
      //   console.log(
      //     prev[key].visibleColumns[5].width,
      //     next[key].visibleColumns[5].width
      //   );
    }
    if (prev[key] !== next[key]) {
      console.log("не равны значения ключа", key);

      return true;
    }
  }
  //   console.log("false");

  return false;
}

export default function areEqualTableRowData(prevProps, nextProps) {
  const { style: prevStyle, ...prevRest } = prevProps;
  const { style: nextStyle, ...nextRest } = nextProps;

  return (
    !shallowDiffers(prevStyle, nextStyle) && !shallowDiffers(prevRest, nextRest)
  );
}
