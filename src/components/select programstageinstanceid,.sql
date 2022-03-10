select programstageinstanceid,
  storedby,
  status
from programstageinstance where date(created) = '2022-02-28';