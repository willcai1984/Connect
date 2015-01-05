# -*- coding: utf-8 -*- 
import os
def log2std(logfile):
    log_dir, log_file = os.path.split(logfile)
    # if null create the folder
    if not os.path.exists(log_dir):
        os.makedirs(log_dir) 
    log_file_name, log_file_suffix = os.path.splitext(log_file)
    stdfile = log_dir + '/' + log_file_name + '.std'
    if not os.path.exists(logfile):
        # if null, create the file
        os.system("echo ''>" + logfile)
    if not os.path.exists(stdfile):
        # if null, create the file
        os.system("echo ''>" + stdfile)
    return stdfile
