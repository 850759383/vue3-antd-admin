<template>
    <div class="icon__container" style="height: 100%;">
        <a-card bordered={false}>
            <a-form layout="inline">
                <a-form-item>
                    <a-input placeholder="Username">
                        <template #prefix>
                            <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input type="password" placeholder="Password">
                        <template #prefix>
                            <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit">
                        Log in
                    </a-button>
                </a-form-item>
            </a-form>
        </a-card>
        <a-card style="margin-top: 32px;" bordered={false}>
            <a-table :columns="columns" :data-source="data?.data" :pagination="pagination" @change="handleTableChange" row-key="id"
                :loading="loading"  :scroll="{ y: 240 }">
                <template #headerCell="{ column }">
                    <!-- <template v-if="column.key === 'name'">
                        <span>
                            Name
                        </span>
                    </template> -->
                </template>
                <template #bodyCell="{ column, text }">
                    <!-- <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template> -->
                </template>
            </a-table>
        </a-card>
    </div>
</template>
<script setup lang="ts">
import { getCameras } from '@/api/camera';
import { Camera } from '@/types/api/camera';
import { PageData } from '@/types/api/public'
import { TableProps } from 'ant-design-vue';
import { computed, onMounted, ref } from 'vue'

const columns = [
    {
        name: '相机名称',
        dataIndex: 'cameraName',
        key: 'cameraName',
    },
    {
        title: '设备编号',
        dataIndex: 'deviceCode',
        key: 'deviceCode',
    },
    {
        title: '相机地址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
    },
    {
        title: 'Action',
        key: 'action',
    },
];

const data = ref<PageData<Camera>>()
const loading = ref<boolean>(false)
//const pagination = ref<any>()

onMounted(() => {
    console.log(123)
})

const pagination = computed(() => (
    {
        total: data.value?.pageCount ?? 1,
        current: data.value?.currentPage ?? 1,
        pageSize: data.value?.pageSize ?? 20,
    }
))

const handleTableChange = (
    pag: { pageSize: number; current: number },
    filters: any,
    sorter: any,
) => {
    getData(pag.current)
}

const getData = (page: number) => {
    loading.value = true
    getCameras({
        page: page
    }).then(res => {
        console.log(res.data.data?.data)
        var a = data.value
        data.value = res.data.data!;
        loading.value = false
    }) .catch(err => {
        data.value = false
    })
}

getData(1)
</script>