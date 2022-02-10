select storedby,
  COUNT(programstageinstanceid) filter (
    where status = 'COMPLETED'
      and vaccine is not null
      and dose is not null
  ) as completed,
  COUNT(programstageinstanceid) filter (
    where status = 'ACTIVE'
      and vaccine is not null
      and dose is not null
  ) as active
from (
    select programstageinstanceid,
    storedby,
    eventdatavalues->'bbnyNYD1wgS'->>'value' as vaccine,
    eventdatavalues->'LUIsbsm3okG'->>'value' as dose,
    status
  from programstageinstance p
    inner join organisationunit o using(organisationunitid)
  where date(p.created) between '${start}' and '${end}'
    and string_to_array(
      trim(
        both '/'
        from o.path
      ),
      '/'
    ) && string_to_array('${units}', '-')
    and p.deleted = false
    and status in('ACTIVE', 'COMPLETED')
    and storedby ILIKE CASE
      WHEN '${username}' = ' ' THEN '%'
      ELSE '%${username}%'
    END
  ) psi
group by storedby;
select storedby,
  COUNT(*)
from programinstance pi
  inner join organisationunit o using(organisationunitid)
where date(pi.created) between '${start}' and '${end}'
  and string_to_array(
    trim(
      both '/'
      from o.path
    ),
    '/'
  ) && string_to_array('${units}', '/')
  and deleted = false
group by storedby;
select name,
  string_to_array(
    trim(
      both '/'
      from path
    ),
    '/'
  ) && string_to_array('JwrOMkgaHZd/ztIyIYAzFKp', '/')
from organisationunit
where hierarchylevel = 5;
select COUNT(*),
  storedby,
  eventdatavalues->'bbnyNYD1wgS'->>'value' as vaccine,
  eventdatavalues->'LUIsbsm3okG'->>'value' as dose,
  status
from programstageinstance
group by storedby,
  status,
  dose,
  vaccine
select COUNT(*),
  storedby,
  eventdatavalues->'bbnyNYD1wgS'->>'value' as vaccine,
  eventdatavalues->'LUIsbsm3okG'->>'value' as dose,
  status
from programstageinstance p
  inner join organisationunit o using(organisationunitid)
where date(p.created) between '${start}' and '${end}'
  and string_to_array(
    trim(
      both '/'
      from o.path
    ),
    '/'
  ) && string_to_array('${units}', '/')
  and p.deleted = false
  and status in('ACTIVE', 'COMPLETED')
group by storedby,
  vaccine,
  dose,
  status;
select storedby,
  status,
  COUNT(*)
from (
    select programstageinstanceid,
      storedby,
      eventdatavalues->'bbnyNYD1wgS'->>'value' as vaccine,
      eventdatavalues->'LUIsbsm3okG'->>'value' as dose,
      status
    from programstageinstance p
      inner join organisationunit o using(organisationunitid)
    where date(p.created) between '${start}' and '${end}'
      and string_to_array(
        trim(
          both '/'
          from o.path
        ),
        '/'
      ) && string_to_array('${units}', '-')
      and p.deleted = false
      and status in('ACTIVE', 'COMPLETED')
      and storedby ILIKE CASE
        WHEN '${username}' = ' ' THEN '%'
        ELSE '%${username}%'
      END
  ) psi
group by storedby,
  status;
select storedby,
  COUNT(programstageinstanceid) filter (
    where status = 'COMPLETED'
      and eventdatavalues->'bbnyNYD1wgS'->>'value' is not null
      and eventdatavalues->'LUIsbsm3okG'->>'value' is not null
  ) as completed,
  COUNT(programstageinstanceid) filter (
    where status = 'ACTIVE'
      and eventdatavalues->'bbnyNYD1wgS'->>'value' is not null
      and eventdatavalues->'LUIsbsm3okG'->>'value' is not null
  ) as active
from programstageinstance p
  inner join organisationunit o using(organisationunitid)
where date(p.created) between '${start}' and '${end}'
  and string_to_array(
    trim(
      both '/'
      from o.path
    ),
    '/'
  ) && string_to_array('${units}', '-')
  and p.deleted = false
  and status in('ACTIVE', 'COMPLETED')
  and storedby ILIKE CASE
    WHEN '${username}' = ' ' THEN '%'
    ELSE '%${username}%'
  END
group by storedby;
with filtered_data as(
  select programstageinstanceid,
    storedby,
    eventdatavalues->'bbnyNYD1wgS'->>'value' as vaccine,
    eventdatavalues->'LUIsbsm3okG'->>'value' as dose,
    status
  from programstageinstance p
    inner join organisationunit o using(organisationunitid)
  where date(p.created) between '${start}' and '${end}'
    and string_to_array(
      trim(
        both '/'
        from o.path
      ),
      '/'
    ) && string_to_array('${units}', '-')
    and p.deleted = false
    and status in('ACTIVE', 'COMPLETED')
    and storedby ILIKE CASE
      WHEN '${username}' = ' ' THEN '%'
      ELSE '%${username}%'
    END
)
select storedby,
  COUNT(programstageinstanceid) filter (
    where status = 'COMPLETED'
      and vaccine is not null
      and dose is not null
  ) as completed,
  COUNT(programstageinstanceid) filter (
    where status = 'ACTIVE'
      and vaccine is not null
      and dose is not null
  ) as active
from filtered_data
group by storedby;