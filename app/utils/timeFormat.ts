
export const getHoursUntilNextCheckin = (lastCheckIn: string | undefined): number => {
  if (!lastCheckIn) return 0;
  
  const lastCheckInTime = new Date(lastCheckIn).getTime();
  if (isNaN(lastCheckInTime)) return 0;
  
  const checkInInterval = 24 * 60 * 60 * 1000;
  const nextCheckInTime = lastCheckInTime + checkInInterval;
  const now = Date.now();
  
  if (now >= nextCheckInTime) return 0;
  
  const msUntilNextCheckin = nextCheckInTime - now;
  return Math.ceil(msUntilNextCheckin / (60 * 60 * 1000));
};

export const formatLastCheckIn = (lastCheckIn: string | undefined): string => {
  if (!lastCheckIn) return "N/A";
  
  const d = new Date(lastCheckIn);
  if (isNaN(d.getTime())) return "N/A";
  
  const diffSec = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diffSec < 5) return "just now";
  if (diffSec < 60) return `${diffSec}s ago`;
  
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  
  const diffMo = Math.floor(diffDay / 30);
  if (diffMo < 12) return `${diffMo}mo ago`;
  
  const diffYr = Math.floor(diffMo / 12);
  return `${diffYr}y ago`;
};