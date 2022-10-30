<script>
    // @ts-nocheck
    
        import { createEventDispatcher } from 'svelte';
        import Card from '../general/Card.svelte';
    
        export let role;
    
        const dispatch = createEventDispatcher();
    </script>
    
    <Card width={300} height={200}
        on:deleteTrigger={() => {
            dispatch('delete', {
                role
            });
        }}
        on:settingsTrigger={() => {
            dispatch('edit', {
                role
            });
        }}
    >
        <a slot="title" href={`roles/${role._id}`}>{role.name}</a>
    
        <div slot="content">
            <div>{role.description}</div>
            <div>{role.icon}</div>
        </div>
    </Card>
    
    <style> 
 
    </style>