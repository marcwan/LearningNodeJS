#!/bin/bash

#
# !!! IMPORTANT !!!!
#    MAKE SURE THESE ARE CORRECT FOR YOUR SYSTEM
#
PGREP=/usr/bin/pgrep
AWK=/usr/bin/awk
NODE=/usr/local/bin/node
PS=/bin/ps
PS_FLAGS=wux           # some linux use "ps wup" instead -- check!!!
AWK_PROG='{print $6}'  # on OS X and many linux, res mem size is $6 in "$PS_FLAGS"
PAUSE_TIME=4



txtund=$(tput sgr 0 1)          # Underline
txtbld=$(tput bold)             # Bold
bldred=${txtbld}$(tput setaf 1) #  red
bldylw=${txtbld}$(tput setaf 3) #  yellow
bldgrn=${txtbld}$(tput setaf 2) #  green
txtrst=$(tput sgr0)             # Reset
INFO=${bldgrn}INFO:${txtrst}
ERROR=${bldred}ERROR:${txtrst}
WARN=${bldylw}WARNING:${txtrst}

app_name=`basename $0`


function usage ()
{
    echo "usage: $app_name max_memory n_crashes n_minutes script.js [...]"
    echo "         - max_memory in MB"
    echo "         - permit no more than 'n_crashes' per 'n_minutes'"
    exit 1;
}

function check_progs
{
    if [ ! -f $NODE ]; then echo "$ERROR Missing $NODE, aborting"; exit 1; fi
    if [ ! -f $PGREP ]; then echo "$ERROR Missing $PGREP, aborting"; exit 1; fi
    if [ ! -f $AWK ]; then echo "$ERROR Missing $AWK, aborting"; exit 1; fi
    if [ ! -f $PS ]; then echo "$ERROR Missing $PS, aborting"; exit 1; fi
}

function already_running
{
    echo "'node $1' already be running. Cowardly refusing to start another."
    exit 1
}


check_progs

if [ $# -lt 4 ];
then
    usage
fi

# bash only does integer arithmetic, so we'll mult by 100
# to avoid decimals
RESTART_WEIGHT=0
MAX_WEIGHT=$(( $3 * 6000 ))
WEIGHT_TIME_CHUNK=$(( (6000 * $3) / $2 ))
FADE_TIME_CHUNK=$(( ($MAX_WEIGHT / $2) / (600 / ($PAUSE_TIME * 10)) ))
#echo $WEIGHT_TIME_CHUNK $MAX_WEIGHT $FADE_TIME_CHUNK

# first make sure it's not running.
PID=`$PGREP -n -f "$NODE $4"`
if [ "$PID" != "" ]; then
    already_running $4
fi

# now launch it and start monitoring
echo "$INFO Launching node..."
$NODE $4 $5 $6 $7 $8 $9 $10 $11 $12 $13 $14 &

while true
do
    sleep $PAUSE_TIME

    PID=`$PGREP -n -f "$NODE $4"`
    NEED_RESTART=no
    if [ "$PID" == "" ]; then
        echo
        echo "$WARN Node appears to have crashed."
        NEED_RESTART=yes
    else
        # check memory usage
        MEM_USAGE=`$PS $PS_FLAGS $PID | $AWK 'NR>1' | $AWK "$AWK_PROG"`
        MEM_USAGE=$(( $MEM_USAGE / 1024 ))
        if [ $MEM_USAGE -gt $1 ];
        then
            echo "$ERROR node has exceed permitted memory of $1 mb, restarting."
            kill $PID
            NEED_RESTART=yes
        fi
    fi
    RESTART_WEIGHT=$(($RESTART_WEIGHT - $FADE_TIME_CHUNK))
    if [ "$RESTART_WEIGHT" -lt "0" ];
    then
        RESTART_WEIGHT=0
    fi
    if [ "$NEED_RESTART" == "yes" ];
    then
        if [ "$RESTART_WEIGHT" -le "$MAX_WEIGHT" ];
        then
            echo "$INFO Restarting..."
            $NODE $4 $5 $6 $7 $8 $9 $10 $11 $12 $13 $14 &
            RESTART_WEIGHT=$(( $RESTART_WEIGHT + $WEIGHT_TIME_CHUNK ))
        else
            echo "$ERROR Too many restarts. Aborting."
            exit -1
        fi
    fi
done
