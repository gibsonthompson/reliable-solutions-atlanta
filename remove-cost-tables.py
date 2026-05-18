#!/usr/bin/env python3
"""
Run this from the root of the waterhelpme.com project:
    python3 remove-cost-tables.py

Removes the {/* Cost Table */} section from all service pages.
Creates backups before editing.
"""

import os
import shutil

SERVICE_PAGES = [
    'app/basement-waterproofing/page.js',
    'app/cocnrete-repair/page.js',
    'app/crawl-space-encapsulation/page.js',
    'app/crawl-space-repair/page.js',
    'app/crawl-space-waterproofing/page.js',
    'app/drainage/page.js',
    'app/foundation-repair/page.js',
]

def remove_cost_table_section(content):
    lines = content.split('\n')
    result = []
    i = 0
    removed = False
    while i < len(lines):
        line = lines[i]
        if '{/* Cost Table */}' in line:
            removed = True
            i += 1  # skip comment
            section_depth = 0
            while i < len(lines):
                if '<section' in lines[i]:
                    section_depth += 1
                if '</section>' in lines[i]:
                    if section_depth <= 1:
                        i += 1
                        break
                    section_depth -= 1
                i += 1
            # skip trailing blank line
            if i < len(lines) and lines[i].strip() == '':
                i += 1
            continue
        result.append(line)
        i += 1
    return '\n'.join(result), removed

def main():
    for page_path in SERVICE_PAGES:
        if not os.path.exists(page_path):
            # Try src/ prefix
            alt = 'src/' + page_path
            if os.path.exists(alt):
                page_path = alt
            else:
                print(f"  SKIP  {page_path} (not found)")
                continue
        
        with open(page_path, 'r') as f:
            original = f.read()
        
        new_content, removed = remove_cost_table_section(original)
        
        if removed:
            # Create backup
            backup = page_path + '.bak'
            shutil.copy2(page_path, backup)
            
            with open(page_path, 'w') as f:
                f.write(new_content)
            
            print(f"  DONE  {page_path} (backup: {backup})")
        else:
            print(f"  SKIP  {page_path} (no cost table found)")
    
    print("\nAll cost tables removed. Run 'git diff' to verify changes.")
    print("To undo: rename .bak files back to .js")

if __name__ == '__main__':
    main()
