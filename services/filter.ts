import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../prisma/prisma-client';
import { Filter } from '@prisma/client';
import { axiosInstance } from './instance';
import { Api } from './api-client';

export const getAll = async (): Promise<Filter[]> => {
  return (await axiosInstance.get<Filter[]>('/Filter')).data;
};
