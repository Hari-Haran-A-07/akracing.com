#!/usr/bin/env python3
"""
AJITH KUMAR RACING (AKR) — SQL Execution Bridge (Python + SQLite)
Executes arbitrary SQL queries with schema persistence and returns JSON records.
"""

import sys
import os
import sqlite3
import json
import time

DB_FILE = os.path.join(os.path.dirname(__file__), 'akr_telemetry.db')
SCHEMA_FILE = os.path.join(os.path.dirname(__file__), 'schema.sql')
SEED_FILE = os.path.join(os.path.dirname(__file__), 'seed_telemetry.sql')

def init_db(force_reseed=False):
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    
    # Check if table exists
    cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='lap_telemetry'")
    exists = cur.fetchone()
    
    if not exists or force_reseed:
        with open(SCHEMA_FILE, 'r') as f:
            cur.executescript(f.read())
        with open(SEED_FILE, 'r') as f:
            cur.executescript(f.read())
        conn.commit()
        
    conn.close()

def run_query(sql_text):
    init_db()
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    
    start_time = time.perf_counter()
    
    try:
        # If multiple statements
        if ';' in sql_text.strip()[:-1]:
            cur.executescript(sql_text)
            conn.commit()
            rows = []
            columns = []
        else:
            cur.execute(sql_text)
            if sql_text.strip().upper().startswith('SELECT') or sql_text.strip().upper().startswith('WITH'):
                records = cur.fetchall()
                columns = [desc[0] for desc in cur.description] if cur.description else []
                rows = [dict(r) for r in records]
            else:
                conn.commit()
                rows = [{'affected_rows': cur.rowcount}]
                columns = ['affected_rows']
                
        duration_ms = round((time.perf_counter() - start_time) * 1000, 3)
        
        return {
            'success': True,
            'columns': columns,
            'rows': rows,
            'row_count': len(rows),
            'execution_time_ms': duration_ms,
            'sql': sql_text
        }
    except Exception as e:
        duration_ms = round((time.perf_counter() - start_time) * 1000, 3)
        return {
            'success': False,
            'error': str(e),
            'execution_time_ms': duration_ms,
            'sql': sql_text
        }
    finally:
        conn.close()

def get_schema_meta():
    init_db()
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    
    cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
    tables = [r[0] for r in cur.fetchall()]
    
    schema = {}
    for t in tables:
        cur.execute(f"PRAGMA table_info({t})")
        cols = cur.fetchall()
        schema[t] = [{'name': c[1], 'type': c[2], 'notnull': bool(c[3]), 'pk': bool(c[5])} for c in cols]
        
    conn.close()
    return schema

if __name__ == '__main__':
    if len(sys.argv) > 1:
        arg = sys.argv[1]
        if arg == '--schema':
            print(json.dumps(get_schema_meta(), indent=2))
        elif arg == '--reseed':
            init_db(force_reseed=True)
            print(json.dumps({'status': 'RESEEDED_OK'}))
        else:
            print(json.dumps(run_query(arg), indent=2))
    else:
        # Default run sample query
        sample = """
        SELECT lap_number, lap_time_seconds, sector1_seconds, sector2_seconds, sector3_seconds, top_speed_kmh, tire_wear_pct 
        FROM lap_telemetry 
        ORDER BY lap_number ASC 
        LIMIT 5;
        """
        print(json.dumps(run_query(sample), indent=2))
