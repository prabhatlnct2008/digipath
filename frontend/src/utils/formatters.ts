export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatTime = (timeString: string): string => {
  // Assuming timeString is in HH:MM:SS or HH:MM format
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const min = minutes || '00';
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${min} ${period}`;
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  return `${hours} hr ${remainingMinutes} min`;
};

export const formatDateTime = (dateString: string, timeString: string): string => {
  return `${formatDate(dateString)} at ${formatTime(timeString)}`;
};

export const formatFileSize = (sizeInMB: number): string => {
  if (sizeInMB < 1024) {
    return `${sizeInMB.toFixed(2)} MB`;
  }
  const sizeInGB = sizeInMB / 1024;
  return `${sizeInGB.toFixed(2)} GB`;
};
