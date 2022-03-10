select storedby,
  COUNT(*) filter (
    where status = 'ACTIVE'
      and vaccine is not null
      and dose is not null
  ) as active,
  COUNT(programstageinstanceid) filter (
    where status = 'COMPLETED'
      and vaccine is not null
      and dose is not null
  ) as completed
from (
    select programstageinstanceid,
      storedby,
      eventdatavalues->'bbnyNYD1wgS'->>'value' as vaccine,
      eventdatavalues->'LUIsbsm3okG'->>'value' as dose,
      status
    from programstageinstance p
      inner join organisationunit o using(organisationunitid)
    where date(p.created) between '2022-02-28' and '2022-02-28'
      and string_to_array(
        trim(
          both '/'
          from o.path
        ),
        '/'
      ) && string_to_array('G0rlphd2tcD-F1o6qBSx783', '-')
      and p.deleted = false
      and status in('ACTIVE', 'COMPLETED')
      and storedby ILIKE CASE
        WHEN ' ' = ' ' THEN '%'
        ELSE '% %'
      END
  ) psi
group by storedby;


LUIsbsm3okG