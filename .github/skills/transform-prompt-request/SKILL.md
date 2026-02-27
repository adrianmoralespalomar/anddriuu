---
name: transform-prompt-request
description: Converts informal prompt requests into structured instructions for development
---

When the user describes a task informally (voice or text):

1. Transform the request into:

- Context (only if applicable)
- Objective
- Requirements
- Task

2. Do NOT repeat the overall project context

3. Fill in any missing information reasonably

4. If there is a technical decision:

- Propose options

- Recommend one

5. After structuring:

- Execute the task

Rules:

- Be clear and concise
- Don't over-explain
- Prioritize action
