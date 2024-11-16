const extractFilename = (url: string): string => {
  const match = url.match(
    /\/[0-9]+_[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/
  );
  return match ? match[0].replace(/\//g, "") : ""; // 슬래시(/) 제거
};

export default extractFilename;
